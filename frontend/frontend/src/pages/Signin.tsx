import { Auth } from "../Component/Auth";
import { Quotes } from "../Component/Quotes";
export const Signin = ()=>{
    return (
        <div className="grid grid-cols-1  lg:grid-cols-2">
<div>
    <Auth type="signin"/>
</div>
<div className=" hidden lg:block">
    <Quotes />
</div>

        </div>
    )
}