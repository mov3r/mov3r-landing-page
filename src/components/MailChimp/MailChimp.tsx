import React from 'react'
import MailchimpSubscribe, { EmailFormFields } from 'react-mailchimp-subscribe'
import './MailChimp.scss'
import SubscribeForm from '../SubscribeForm';

type Props = {}

const MailChimp: React.FC<Props> = (props) => {
  const postUrl: string = process.env.REACT_APP_PUBLIC_MAILCHIMP_URL!
  return (
    <div className="MailChimp">
      <MailchimpSubscribe
        url={postUrl}
        render={(props) => {
          const {subscribe, status, message} = props || {};
          return (
            <SubscribeForm
              status={status}
              message={message}
              onValidated={(formData: EmailFormFields) => subscribe( formData ) }
          />
        );
      } }
      />
    </div>
  )
}

export default React.memo(MailChimp)
