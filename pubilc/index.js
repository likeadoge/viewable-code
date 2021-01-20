import { DgComponent, DgContainer } from './framework/index.js'
import {main} from './meta/index.js'

main()


const Hello = DgComponent.builder()
    .template(document.getElementById('hello').innerHTML)
    .namespace("list", () => ['World', 'Doge'])
    .build()

const App = DgComponent.builder()
    .use({ Hello })
    .events({
        ['change']: () => { },
    })
    .props({
        title: () => '测试 title'
    })
    .methods(() => ({
        getTimes: () => { },
        getList: () => { }
    }))
    .template(document.getElementById('tpl').innerHTML)
    .namespace("times", () => 3)
    .namespace("list", () => [
        { type: 'text', text: 'test' },
        { type: 'input', value: 'test' },
        {}
    ])
    .build()

new DgContainer(document.querySelector('#app'))
    .inject(App)

