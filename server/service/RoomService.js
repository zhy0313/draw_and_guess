global.roomId = 232232
let room = null;
function getUserArray(currentUsers) {
  return Object.values(currentUsers).map(u => {
    return {
      username: u.username,
      id: u.id
    }
  })
}
function userLeave (ctx) {
  const { userClient, currentUsers, roomMap, userMap, currentRoom} = ctx
  if (currentRoom && currentRoom.status === 1) {
    Object.values(currentUsers).forEach(u => {
      if (userClient.id === u.id) {
        delete currentUsers[u.id]
      }
    })
    currentRoom.joined = Object.values(currentUsers).length
    global.$emit('room-changed', {userMap, roomChangeData: currentRoom})
  }
  sendUserNumber(userMap)
}

global.$on('userLeave', userLeave)

function sendToSub(userMap, room, type) {
  if (room.type === '1') {
    Object.values(userMap).forEach(user => {
      if (user.changeSub) {
        user.send(room, type)
      }
    })
  }
}

function sendUserNumber (userMap) {
  const onlineUserNumber = Object.values(userMap).filter(u => u.isOnline).length
  console.log('send userNumber: ', onlineUserNumber)
  Object.values(userMap).forEach(u => {
    if (u.changeSub) {
      u.send(onlineUserNumber, 'userNumber')
    }
  })
}
global.$on('userLogin', ({userClient, userMap, currentUsers}) => {
  if (currentUsers) {
    currentUsers[userClient.id] = userClient
  }
  sendUserNumber(userMap)
})

global.$on('room-changed', ({userMap, roomChangeData}) => {
  sendToSub(userMap, {id: roomChangeData.id, type: roomChangeData.type, joined: roomChangeData.joined, status: roomChangeData.status}, 'roomChanged')
})

global.$on('room-created', ({userMap, roomChangeData}) => {
  sendToSub(userMap, roomChangeData, 'roomCreated')
})

export default {
  changeUnSub ({userClient}) {
    userClient.changeSub = false
  },
  changeSub ({userClient}) {
    userClient.changeSub = true
  },
  list ({send, roomMap, roomUser}) {
    const rooms = Object.values(roomMap).filter(room => {
      room.joined = Object.values(roomUser[room.id]).length
      return room.joined > 0 && room.type === '1'
    }).sort((a, b) => {
      if (a.joined > b.joined) {
        return 1
      } else if (a.createTime > b.createTime) {
        return 1
      } else {
        return 0
      }
    })
    send(rooms)
  },
  create ({ data, userClient, roomMap, roomUser, userMap, send }) {
    if(room != null){
      send(room)
    }else{
      room = {
        id: 232232,
        name: data.name,
        createTime: 1,
        playNumber: 6,
        playTimes: 1,
        joined: 1,
        type: data.type,
        status: 1,
        gameTime: 60
      }
      roomMap[room.id] = room
      roomUser[room.id] = {}
      send(room)
    }
  },
  enter ({ data, userClient, roomMap, roomUser, send, sendToSameRoom, userMap, sendError }) {
    const room = roomMap[232232]
    const roomUsers = roomUser[room.id] || {}
    roomUser[room.id] = roomUsers
    const isReLink = roomUsers[userClient.id]
    if (room.joined >= room.playNumber) {
      return sendError({msg: '房间人数已满，不可加入'})
    } else if (room.status === 2) {
      return sendError({msg: '该房间游戏已开始，不可加入'})
    } else {
      roomUsers[userClient.id] = userClient
      room.joined = Object.values(roomUsers).length
      userClient.currentRoomId = room.id
      send(room)
      sendToSameRoom(getUserArray(roomUsers), 'userEnter')
      if (room.joined === 1) {
        global.$emit('room-created', {userMap, roomChangeData: room})
      } else {
        global.$emit('room-changed', {userMap, roomChangeData: room})
      }
    }
  },
  leave: userLeave
}
