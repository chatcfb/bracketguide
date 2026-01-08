import Create from './pages/Create';
import DailyPickEm from './pages/DailyPickEm';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyChannel from './pages/MyChannel';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Create": Create,
    "DailyPickEm": DailyPickEm,
    "Explore": Explore,
    "Home": Home,
    "Marketplace": Marketplace,
    "MyChannel": MyChannel,
    "Profile": Profile,
    "Landing": Landing,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
    Layout: __Layout,
};