import RoomService from './RoomService'
import UserService from './UserService'
import GameService from './GameService'
export default {
  login: UserService.login,
  createRoom: RoomService.create,
  enterRoom: RoomService.enter,
  roomList: RoomService.list,
  chatMsg: GameService.msg,
  beginGame: GameService.begin,
  gameData: GameService.getData,
  drawAction: GameService.drawAction,
  drawImage: GameService.drawImage,
  userNumber: UserService.userNumber,
  default ({ type }) {
    console.log('unknow message', type)
  }
}
