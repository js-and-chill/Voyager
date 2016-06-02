
import { ipcRenderer } from 'electron'

const listenTo = (shortcut, accelerator, prop) => {
  ipcRenderer.on(accelerator, () => shortcut[prop]())
}

export default Component =>
  class Listener extends Component {
  
    constructor (props) {
    
      super({ ...props, listenTo })
    }

    componentWillMount () {
    

    }
  }
