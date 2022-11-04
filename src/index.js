import "./css/style.scss";
import { AppComponent } from "./components/app.component";
import { StatusBar } from "@capacitor/status-bar";

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  StatusBar.hide().then(() => {});
}

new AppComponent("app");
