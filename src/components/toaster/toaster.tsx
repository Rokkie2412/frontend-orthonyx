
import { Toaster } from "sonner";
import { MdError, MdCheck } from "react-icons/md";

const ToasterItem = (): React.ReactElement => (
  <Toaster
    duration={4000}
    closeButton={true}
    richColors={true}
    icons={{
      error: <MdError className="text-red-600 text-2xl" />,
      success: <MdCheck className="text-green-600 text-2xl" />
    }}
  />
)

export default ToasterItem
