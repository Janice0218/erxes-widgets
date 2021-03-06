import * as moment from "moment";
import * as React from "react";
import * as RTG from "react-transition-group";
import { facebook, twitter, youtube } from "../../icons/Icons";
import {
  IIntegrationLink,
  IIntegrationMessengerData,
  IIntegrationMessengerDataMessagesItem,
  IUser
} from "../../types";
import { __ } from "../../utils";
import { TopBar } from "../containers";
import { Integrations } from "./";
import { SocialLink, Supporters } from "./common";

type Props = {
  supporters: IUser[];
  loading?: boolean;
  color?: string;
  messengerData: IIntegrationMessengerData;
};

type State = {
  headHeight: number;
};

class Home extends React.Component<Props, State> {
  private node: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = { headHeight: 120 };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.node && prevState.headHeight !== this.node.offsetHeight) {
      this.setState({ headHeight: this.node.offsetHeight });
    }
  }

  componentDidMount() {
    if (this.node) {
      this.setState({ headHeight: this.node.offsetHeight });
    }
  }

  renderGreetings(messengerData: IIntegrationMessengerData) {
    const messages =
      messengerData.messages || ({} as IIntegrationMessengerDataMessagesItem);

    const greetings = messages.greetings || {};

    return (
      <div className="welcome-info">
        <h3>{greetings.title || __("Welcome")}</h3>
        <div className="description">
          {greetings.message || __("Welcome description")}
        </div>
      </div>
    );
  }

  renderAssistBar(messengerData: IIntegrationMessengerData) {
    const links = messengerData.links || ({} as IIntegrationLink);

    return (
      <div className="assist-bar">
        <time>{moment(new Date()).format("MMMM Do YYYY, h:mm a")}</time>
        <div className="socials">
          <SocialLink url={links.facebook} icon={facebook} />
          <SocialLink url={links.twitter} icon={twitter} />
          <SocialLink url={links.youtube} icon={youtube} />
        </div>
      </div>
    );
  }

  renderHead() {
    const { supporters, loading, messengerData } = this.props;

    return (
      <div
        className="erxes-welcome"
        ref={node => {
          this.node = node;
        }}
      >
        {this.renderAssistBar(messengerData)}
        {this.renderGreetings(messengerData)}
        <Supporters users={supporters} isExpanded={false} loading={loading} />
      </div>
    );
  }

  render() {
    return (
      <div
        className="erxes-home-container"
        style={{ paddingTop: this.state.headHeight }}
      >
        <TopBar middle={this.renderHead()} />
        <div className="erxes-home-content">
          <RTG.CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames="slide"
          >
            <div className="erxes-home-item">
              <Integrations />
            </div>
          </RTG.CSSTransition>
        </div>
      </div>
    );
  }
}

export default Home;
