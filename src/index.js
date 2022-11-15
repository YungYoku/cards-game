import "./css/style.scss";
import { AppComponent } from "./components/app.component";
import { StatusBar } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  StatusBar.hide().then(() => {});
  SplashScreen.hide().then(() => {});
}

new AppComponent("app");
