import * as classNames from "classnames";
import * as moment from "moment";
import * as React from "react";
import * as striptags from "striptags";
import { defaultAvatar } from "../../icons/Icons";
import { __ } from "../../utils";
import { IConversation } from "../types";

type Props = {
  conversation: IConversation;
  notificationCount: number;
  goToConversation: (conversationId: string) => void;
};

function ConversationItem({
  conversation,
  notificationCount,
  goToConversation
}: Props) {
  const { _id, content, createdAt } = conversation;
  const participatedUsers = conversation.participatedUsers;
  let participatedUser = null;

  if (participatedUsers && participatedUsers.length > 0) {
    participatedUser = participatedUsers[0];
  }

  let avatar = defaultAvatar;
  let fullName = (__("Support staff") || {}).toString();

  if (participatedUser && participatedUser.details) {
    avatar = participatedUser.details.avatar;
    fullName = participatedUser.details.fullName;
  }

  return (
    <li
      className={classNames("erxes-conversation-item", {
        unread: notificationCount > 0
      })}
      onClick={() => {
        goToConversation(_id);
      }}
    >
      <img className="erxes-left-side" src={avatar} alt={fullName} />
      <div className="erxes-right-side">
        <div
          className="erxes-date erxes-tooltip"
          data-tooltip={moment(createdAt).format("YYYY-MM-DD, HH:mm:ss")}
        >
          {moment(createdAt).format("LT")}
        </div>
        <div className="erxes-name">{fullName}</div>
        <div className="erxes-last-message">{striptags(content)}</div>
      </div>
    </li>
  );
}

export default ConversationItem;
