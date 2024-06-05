import React from "react";

export default function Telegram() {
  const handleTelegramClick = () => {
    // Trigger Facebook sharing dialog
    window.open(
      // "https://t.me/share/url?url=https://developers.facebook.com/docs/&text=Please click on my referral code"
      // "https://t.me/+ulrjMMnl0Y5jMDRl",'_blank', 'width=600,height=600',
      "https://api.telegram.org/bot7178447161:AAF87KgQ4bZSxBzAiSB17a-f2XlkoXFH_IU/getChatMember?chat_id=-1001973509217&user_id=7158487826"
    );
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleTelegramClick()}
      >
        Telgram
      </button>
    </div>
  );
}
