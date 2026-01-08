import Create from './pages/Create';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import MyChannel from './pages/MyChannel';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Create": Create,
    "Explore": Explore,
    "Home": Home,
    "Marketplace": Marketplace,
    "Profile": Profile,
    "MyChannel": MyChannel,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};