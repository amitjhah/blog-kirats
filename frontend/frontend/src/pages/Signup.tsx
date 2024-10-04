import { Auth } from "../Component/Auth";
import { Quotes } from "../Component/Quotes"

export const Signup = ()=>{
    return (<div className="grid grid-cols-2">
        <div>
            <Auth type="signup"/>
        </div>
    <div className="invisible md:visible">
<Quotes/>
    </div>

    </div>
    );
}