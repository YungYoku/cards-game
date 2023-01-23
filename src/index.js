import "./css/style.scss";
import {AppComponent} from "./components/app.component";

try {
    window.screen.orientation.lock("portrait");
} catch (error) {
    console.log(error);
}

new AppComponent("app");
