import Create from './pages/Create';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import MyChannel from './pages/MyChannel';
import Profile from './pages/Profile';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Create": Create,
    "Explore": Explore,
    "Home": Home,
    "Marketplace": Marketplace,
    "MyChannel": MyChannel,
    "Profile": Profile,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};