import React from 'react'
import { decode } from 'html-entities';
import './SubscribeForm.scss'
import Button from '../Button';


type Props = {
  status: "error" | "success" | "sending" | null,
  message: string | Error | null,
  onValidated: unknown
}

const SubscribeForm: React.FC<Props> = (props) => {

  const [ error, setError ] = React.useState<string | null>(null);
  const [ email, setEmail ] = React.useState(null);

  const handleFormSubmit = () => {
    setError(null);
    if ( ! email ) {
      setError( 'Please enter a valid email address' );
      return null;
    }

    // @ts-ignore
    const isFormValidated = props.onValidated({ EMAIL: email });

    // On success return true
    // @ts-ignore
    return email && email.indexOf("@") > -1 && isFormValidated;
  }


  const handleInputKeyEvent = ( event: React.KeyboardEvent<HTMLInputElement> ) => {
    setError(null);
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  }

  const getMessage = (message: string | null ) => {
    if ( !message ) {
      return null;
    }
    const result = message?.split('-') ?? null;
    if ( "0" !== result?.[0]?.trim() ) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode( formattedMessage ) : null;
  }

  return (
    <>
      <div className="SubscribeForm">
        <div className="field">
          <input
            // @ts-ignore
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            placeholder="Your email"
            className="mr-2"
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
          <Button onClick={handleFormSubmit}>
            Join Waitlist &rarr;
          </Button>
        </div>
      </div>
      <div className="form-info">
        {props.status === "sending" && <div>Sending...</div>}
        {props.status === "error" || error ? (
          <div
            className="newsletter-form-error"
            // @ts-ignore
            dangerouslySetInnerHTML={{ __html: error || getMessage( props.message ) }}
          />
        ) : null }
        {props.status === "success"
          // @ts-ignore
          && props.status !== "error" && !error && (
          // @ts-ignore
          <div dangerouslySetInnerHTML={{ __html: decode(props.message) }} />
        )}
      </div>
    </>
  );
}

export default React.memo(SubscribeForm)
