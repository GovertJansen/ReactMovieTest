import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Define and export the Navbar component
export const Navbar = () => {
    return (
        // Menu component with fixed position at the top and size 'huge'
        <Menu fixed='top' size='huge'>

            {/* Menu item that links to the home page */}
            <Menu.Item as={Link} to='/' style={{ fontSize: "1.5rem" }}>
                Home
            </Menu.Item>

            {/* Menu items positioned to the right */}
            <Menu.Menu position="right">
                {/* Menu item that links to the authentication page */}
                <Menu.Item as={Link} to='/auth' style={{ fontSize: "1.5rem" }}>
                    Login as guest
                </Menu.Item>
            </Menu.Menu>

        </Menu>
    )
}
