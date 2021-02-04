import {abs_Callable} from './base'

export class Ref extends abs_Callable{
    
}

export class Call extends abs_Callable{
    static css = `
    .expr.call{ 
        background:#fff;
        border:1px solid #ccc;
        display:inline-block
    }

    .expr.call>.fn{
        background:#efefef;
        text-align:center;
        box-shadow: 0 0px 0px 0 rgb(0 0 0 / 0%);
        cursor:pointer;
        transition: all 0.3s ease-out;
    }

    .expr.call>.fn:hover{
        background:#cfcfcf;
        box-shadow: 0 1px 5px 0 rgb(0 0 0 / 30%);
    }
    `
}