/**
 * This component renders a loading spiner centered inside a parent container
 * The container must have the required hide so that the spinner is centered
 * in the correct position.
 */
export function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-32 h-32 border-t-4 border-b-4 border-primary rounded-full animate-spin' />
    </div>
  );
}
