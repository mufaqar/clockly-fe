import { toast } from 'react-toastify';

export function processResponse(response: Response) {
  return response.status === 204
    ? Promise.resolve()
    : response.ok
      ? response
          .json()
          .catch(() => Promise.reject('Response not parseable as JSON'))
      : Promise.reject(response);
}

export function handleError(error: any) {
  if (error instanceof Response) {
    error
      .json()
      .then((json) => {
        if (error.status === 400) {
          const validationMessages = json['invalid-properties'] as string[];
          toast.warn(() => (
            <>
              Validierungsfehler:
              <ul>
                {validationMessages?.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </>
          ));
        } else {
          toast.error(
            'Es ist ein Fehler in der Kommunikation mit dem Server aufgetreten.\n\nBitte versuchen Sie es später noch einmal.',
          );
          console.log(json);
        }
      })
      .catch((error) => {
        toast.error(
          'Es ist ein Fehler in der Kommunikation mit dem Server aufgetreten.\n\nBitte versuchen Sie es später noch einmal.',
        );
        console.log(`Response not parseable as JSON: ${error}`);
      });
  } else {
    toast.error(
      'Die Anwendung steht im Moment nicht zur Verfügung.\n\nBitte versuchen Sie es später noch einmal.',
    );
    console.log(error.message);
  }
}
