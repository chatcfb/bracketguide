import Create from './pages/Create';
import DailyPickEm from './pages/DailyPickEm';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Landing from './pages/Landing';
import LogoDemo from './pages/LogoDemo';
import Marketplace from './pages/Marketplace';
import MyChannel from './pages/MyChannel';
import Profile from './pages/Profile';
import GameCenter from './pages/GameCenter';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Create": Create,
    "DailyPickEm": DailyPickEm,
    "Explore": Explore,
    "Home": Home,
    "Landing": Landing,
    "LogoDemo": LogoDemo,
    "Marketplace": Marketplace,
    "MyChannel": MyChannel,
    "Profile": Profile,
    "GameCenter": GameCenter,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
    Layout: __Layout,
};