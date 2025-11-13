import React, { Fragment, PureComponent } from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import { FormattedMessage } from "react-intl";
import Link from "react-router-dom/Link";
import withRouter from "react-router-dom/withRouter";
import styled from "styled-components";

import AddIcon from "../images/icons/menu/add.svg";
import CardsIcon from "../images/icons/menu/cards.svg";
import ArtizyouLogo from "../images/logo_artizyou_revert.svg";
import { setOrientation } from "../utils/image-orientation";
import LogoutIcon from "../images/icons/menu/logout.svg";
import HelpIcon from "../images/icons/menu/help.svg";
import HelpDeskIcon from "../images/icons/menu/help_desk.svg";
import Onboarding from "./Onboarding";
import Modal from "./Modal";
import ProfileIcon from "../images/icons/menu/profile.svg";
import withUser from "../containers/withUser";
import ProfilePlaceholder from "../images/profile-placeholder.png";

const Wrapper = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.artz.secondaryColor};
  z-index: 10;

  ${(props) => props.theme.artz.breakpoint.md} {
    display: flex;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: center;

  ${(props) => props.theme.artz.breakpoint.md} {
    justify-content: space-between;

    .bm-burger-button {
      display: none;
    }
  }
`;

const LogoArtizyou = styled(ArtizyouLogo)`
  position: relative;
  top: 5px;
  width: 125px;
  height: 31px;

  ${(props) => props.theme.artz.breakpoint.md} {
    width: 165px;
  }

  @media screen and (-ms-high-contrast: active),
    screen and (-ms-high-contrast: none) {
    /* IE10+ specific styles go here */
    height: 45px;
  }
`;

const ProfileIconWrapper = styled(ProfileIcon)`
  position: relative;
  top: 1px;
  margin-right: 10px;
`;

const AddIconWrapper = styled(AddIcon)`
  margin-right: 13px;
`;

const CardsIconWrapper = styled(CardsIcon)`
  margin-right: 13px;
`;

const LogoutIconWrapper = styled(LogoutIcon)`
  position: relative;
  top: 1px;
  margin-right: 10px;
`;

const HelpIconWrapper = styled(HelpIcon)`
  position: relative;
  top: 1px;
  margin-right: 10px;
`;

const HelpDeskIconWrapper = styled(HelpDeskIcon)`
  position: relative;
  top: 1px;
  margin-right: 10px;
`;

const MobileLogoutIconWrapper = styled(LogoutIconWrapper)`
  width: 18px;
  height: 18px;
  top: 2px;

  path {
    fill: #fff;
  }
`;

const MobileHelpIconWrapper = styled(HelpIconWrapper)`
  width: 18px;
  height: 18px;
  top: 2px;

  path {
    fill: #fff;
  }
`;

const MobileHelpDeskIconWrapper = styled(HelpDeskIconWrapper)`
  width: 18px;
  height: 18px;
  top: 2px;

  path {
    fill: #fff;
  }
`;

const MobileProfileIconWrapper = styled(ProfileIconWrapper)`
  width: 18px;
  height: 18px;
  top: 2px;

  path {
    fill: #fff;
  }
`;

const MobileAddIconWrapper = styled(AddIconWrapper)`
  width: 18px;
  height: 18px;
  top: 2px;

  path {
    fill: #fff;
  }
`;

const MobileCardsIconWrapper = styled(CardsIconWrapper)`
  width: 18px;
  height: 18px;
  top: 2px;

  path {
    fill: #fff;
  }
`;

const AvatarCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${({ profilePic }) => profilePic || ProfilePlaceholder});
  background-size: cover;
  border-radius: 50px;
`;

const DesktopMenu = styled.div`
  display: none;
  position: relative;
  padding: 0;
  width: 50px;
  height: 50px;
  margin: 0;
  border: 0;
  outline: 0;
  border-radius: 50px;
  cursor: pointer;

  ul.active {
    visibility: visible;
    opacity: 1;
    z-index: 15;
    transform: translateY(0%);
    transition-delay: 0s, 0s, 0.3s;
  }

  &:focus {
    outline: 0;
  }

  ${(props) => props.theme.artz.breakpoint.md} {
    display: block;
  }
`;

const DropDownContent = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 8px 0;
  padding-left: 0px;
  background: #fff;
  border: 1px solid rgba(160, 160, 160, 0.5);
  border-radius: 5px;
  list-style-type: none;
  text-align: left;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  transform: translateY(-2em);
  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s,
    z-index 0s linear 0.01s;

  &:before {
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    bottom: 100%;
    right: 7.5%;
    margin-left: -10px;
    border: solid transparent;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 10px;
  }

  li {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const DesktopItemLink = styled(Link)`
  display: block;
  padding: 3px 20px;
  color: ${(props) => props.theme.artz.secondaryColor};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.artz.dropdownMenuBgColor};
    text-decoration: none;
    color: inherit;
  }
`;

const DesktopExternalLink = styled.a`
  display: block;
  padding: 3px 20px;
  color: ${(props) => props.theme.artz.secondaryColor};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.artz.dropdownMenuBgColor};
    text-decoration: none;
    color: inherit;
  }
`;

const SmallTextWrapper = styled.div`
  display: block;
  position: absolute;
  top: 54px;
  left: 0;
  width: 100%;
  z-index: 100;
  text-align: center;
  background: #f36e2c;

  span {
    color: white;
    font-size: 1rem;
    font-weight: 400;
  }

  @media screen and (min-width: 575px) {
    position: relative;
    top: 0;
    left: 0;
    width: initial;
    z-index: 100;
    text-align: left;
    background: transparent;
  }
`;

const DesktopItem = DesktopItemLink.withComponent("div");

const MobileMenuWrapper = styled.div`
  ${(props) => props.theme.artz.breakpoint.md} {
    display: none;
  }
`;

const MobileMenu = styled(BurgerMenu)`
  display: block;

  ${(props) => props.theme.artz.breakpoint.md} {
    display: none;
  }
`;

const MenuItemLink = styled(Link)`
  display: block;
  padding: 5px;
  margin-bottom: 20px;
  font-family: ${(props) => props.theme.artz.secondaryFont};
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  text-align: left;
  cursor: pointer;

  &:active {
    color: #fff;
  }

  &:hover {
    color: #fff;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const ExternalLink = styled.a`
  display: block;
  padding: 5px;
  margin-bottom: 20px;
  font-family: ${(props) => props.theme.artz.secondaryFont};
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  text-align: left;
  cursor: pointer;

  &:active {
    color: #fff;
  }

  &:hover {
    color: #fff;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const MenuItem = MenuItemLink.withComponent("div");

const MenuStyles = {
  bmBurgerButton: {
    position: "absolute",
    width: "29px",
    height: "22px",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  bmBurgerBars: {
    height: "15%",
    background: "#FFF",
  },
  bmCrossButton: {
    height: "40px",
    width: "40px",
    right: "25px",
    top: "15px",
  },
  bmCross: {
    background: "#FFF",
    height: "30px",
  },
  bmMenu: {
    background: "#343434",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    top: "0",
    left: "0",
  },
  bmMenuWrap: {
    top: "0",
    left: "0",
  },
};

class Header extends PureComponent {
  constructor(props) {
    super(props);

    const { user } = this.props;
    const { onboarding } = user;

    this.state = {
      mobileMenuOpen: false,
      modalOpened: onboarding,
      menuActive: false,
      orientation: "",
    };
  }

  setOrientation = setOrientation.bind(this);

  componentDidMount() {
    document.body.addEventListener(
      "touchstart",
      this.handleCloseBodyProfileMenu,
      true
    );
    document.body.addEventListener(
      "click",
      this.handleCloseBodyProfileMenu,
      true
    );

    const { user } = this.props;
    const { photo } = user;

    if (photo.preview) {
      this.setOrientation(photo.preview);
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { photo } = user;

    if (photo.preview) {
      this.setOrientation(photo.preview);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener(
      "touchstart",
      this.handleCloseBodyProfileMenu
    );
    document.body.removeEventListener("click", this.handleCloseBodyProfileMenu);
  }

  handleToggle = (e) => {
    e.stopPropagation();
    this.setState(({ menuActive }) => ({
      menuActive: !menuActive,
    }));
  };

  handleCloseProfileMenu = (e) => {
    e.stopPropagation();
    if (this.state.menuActive) {
      this.setState({
        menuActive: false,
      });
    }
  };

  handleCloseBodyProfileMenu = (e) => {
    if (this.state.menuActive && e.target.id !== "DesktopMenuTrigger") {
      this.setState({
        menuActive: false,
      });
    }
  };

  handleChangeMobileMenuState = ({ isOpen }) => {
    this.setState({
      mobileMenuOpen: isOpen,
    });
  };

  handleCloseMenu = () => {
    this.handleChangeMobileMenuState({ isOpen: false });
  };

  handleMobileSignOut = () => {
    const { signOut } = this.props;
    signOut();
  };

  handleFaqClick = () => {
    const { user } = this.props;
    const { siteFaq } = user;

    window.open(siteFaq);
  };

  handleSignOut = async () => {
    const { signOut } = this.props;
    signOut();
  };

  handleCloseModal = async () => {
    const { updateUser } = this.props;

    await updateUser({ "user[onboarding]": false });

    this.setState({ modalOpened: false });
  };

  getLogoLink = () => {
    const { user } = this.props;
    const { completedProfile } = user;

    if (completedProfile) {
      return "/creations";
    }

    return "/profile/new";
  };

  availableCreations = () => {
    const { user } = this.props;
    const { plan } = user;
    return plan.creationLimit - plan.creationCount;
  };

  renderCompletedUserMobileNav = () => {
    const { user } = this.props;
    const { completedProfile } = user;

    if (!completedProfile) {
      return null;
    }

    return (
      <Fragment>
        <MenuItemLink to={`/creations`} onClick={this.handleCloseMenu}>
          <MobileCardsIconWrapper />
          <FormattedMessage id="menu.list" />
        </MenuItemLink>
        {this.availableCreations() <= 0 ? (
          <li style={{ padding: "3px 20px" }}>Limit Reached</li>
        ) : (
          <MenuItemLink
            to={`/creations/new/kind`}
            onClick={this.handleCloseMenu}
          >
            <MobileAddIconWrapper />
            <FormattedMessage id="menu.add" />
          </MenuItemLink>
        )}

        <ExternalLink
          href="https://artizyou.freshdesk.com/support/home"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="menu-item">
            <MobileHelpDeskIconWrapper />
            <FormattedMessage id="menu.helpdesk" />
          </div>
        </ExternalLink>
      </Fragment>
    );
  };

  renderCompletedUserNav = () => {
    const { user } = this.props;
    const { completedProfile } = user;

    if (!completedProfile) {
      return null;
    }

    return (
      <Fragment>
        <li>
          <DesktopItemLink
            to={`/creations`}
            onClick={this.handleCloseProfileMenu}
          >
            <CardsIconWrapper />
            <FormattedMessage id="menu.list" />
          </DesktopItemLink>
        </li>
        {this.availableCreations() <= 0 ? (
          <li style={{ padding: "3px 20px" }}>Limit Reached</li>
        ) : (
          <li>
            <DesktopItemLink
              to={`/creations/new/kind`}
              onClick={this.handleCloseProfileMenu}
            >
              <AddIconWrapper />
              <FormattedMessage id="menu.add" />
            </DesktopItemLink>
          </li>
        )}
        <li>
          <DesktopExternalLink
            href="https://artizyou.freshdesk.com/support/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HelpDeskIconWrapper />
            <FormattedMessage id="menu.helpdesk" />
          </DesktopExternalLink>
        </li>
      </Fragment>
    );
  };

  renderMobileMenuWrapper = () => {
    const { user } = this.props;
    const { publicProfile, email } = user;

    if (publicProfile) {
      return null;
    }

    const { mobileMenuOpen } = this.state;

    return (
      <MobileMenuWrapper>
        <MobileMenu
          isOpen={mobileMenuOpen}
          onStateChange={this.handleChangeMobileMenuState}
          styles={MenuStyles}
          width={"100%"}
        >
          <MenuItemLink to={`/profile/new`} onClick={this.handleCloseMenu}>
            <MobileProfileIconWrapper />
            <FormattedMessage id="menu.username" values={{ username: email }} />
          </MenuItemLink>
          {this.renderCompletedUserMobileNav()}
          <MenuItem onClick={this.handleFaqClick}>
            <MobileHelpIconWrapper />
            <FormattedMessage id="menu.faq" />
          </MenuItem>
          <MenuItem onClick={this.handleMobileSignOut}>
            <MobileLogoutIconWrapper />
            <FormattedMessage id="menu.signout" />
          </MenuItem>
        </MobileMenu>
      </MobileMenuWrapper>
    );
  };

  renderDesktopMenu = () => {
    const { user } = this.props;
    const { publicProfile, email } = user;

    if (publicProfile) {
      return null;
    }

    const { menuActive, orientation } = this.state;
    const profilePictureUrl = user.photo["preview"];

    return (
      <DesktopMenu id="DesktopMenuTrigger" onClick={this.handleToggle}>
        <AvatarCircle
          profilePic={profilePictureUrl}
          style={{ transform: `rotate(${orientation})` }}
        />
        <DropDownContent className={menuActive ? "active" : ""}>
          <li>
            <DesktopItemLink
              to={`/profile/new`}
              onClick={this.handleCloseProfileMenu}
            >
              <ProfileIconWrapper />
              <FormattedMessage
                id="menu.username"
                values={{ username: email }}
              />
            </DesktopItemLink>
          </li>

          {this.renderCompletedUserNav()}

          <li>
            <DesktopItem onClick={this.handleFaqClick}>
              <HelpIconWrapper />
              <FormattedMessage id="menu.faq" />
            </DesktopItem>
          </li>
          <li>
            <DesktopItem onClick={this.handleSignOut}>
              <LogoutIconWrapper />
              <FormattedMessage id="menu.signout" />
            </DesktopItem>
          </li>
        </DropDownContent>
      </DesktopMenu>
    );
  };

  renderAppLogo = () => {
    const { user } = this.props;
    const { publicProfile } = user;

    if (publicProfile) {
      return <LogoArtizyou />;
    }

    return (
      <div>
        <Link to={this.getLogoLink()}>
          <LogoArtizyou />
        </Link>
      </div>
    );
  };

  renderPromoPlan = () => {
    const { user } = this.props;
    const { plan } = user;

    return (
      <div>
        <SmallTextWrapper>
          <FormattedMessage
            id="creations.new.registration.payment_section.options.save_creation.plan_info"
            values={{
              left: plan.creationLimit - plan.creationCount,
              limit: plan.creationLimit,
            }}
          />
        </SmallTextWrapper>
      </div>
    );
  };

  render() {
    const { modalOpened } = this.state;

    return (
      <Wrapper>
        <div className="container">
          <MenuWrapper>
            {this.renderMobileMenuWrapper()}

            <div>{this.renderAppLogo()}</div>

            <div>{this.renderPromoPlan()}</div>

            <div>{this.renderDesktopMenu()}</div>
          </MenuWrapper>
        </div>

        <Modal
          closeModal={this.handleCloseModal}
          opened={modalOpened}
          size="sm"
          closeLabel="skip"
        >
          <Onboarding closeModal={this.handleCloseModal} />
        </Modal>
      </Wrapper>
    );
  }
}

export default withRouter(withUser(Header));
