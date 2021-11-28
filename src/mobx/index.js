import {flow, makeObservable, observable, onBecomeObserved} from "mobx";
import api from "../shared/api";
import {observer} from 'mobx-react-lite';
import User from "../shared/components/User";

class UserStore {
    name = '';
    id = null;

    constructor() {
        makeObservable(this, {
            name: observable,
            id: observable,
            fetch: flow.bound
        })

        onBecomeObserved(this, 'name', this.fetch)
    }

    *fetch() {
        const response = yield api.getMe()

        this.name = response.name;
        this.id = response.id;
    }
}

const users = new UserStore();

const MobxApp = observer(() => {
    return (
        <User name={users.name}/>
    )
})

export default function MobxWay() {
    return (
        <div>
            <MobxApp />
        </div>
    )
}
