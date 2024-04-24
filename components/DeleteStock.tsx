import { stock } from "@/app/admin/page";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import axios from "axios";
import toast from "react-hot-toast";

interface DeleteStockProps {
  children: React.ReactNode;
  data: stock;
}

function DeleteStock({ children, data }: DeleteStockProps) {
  const handleDelete = (values: stock) => {
    return new Promise((resolve, reject) => {
      toast.loading("Deleting stock....");
      axios
        .delete(`https://gin-backend.onrender.com/admin/stocks/${values.id}`)

        .then((res) => {
          toast.success("Delete successful");
          resolve(res);
          window.location.reload();
        })
        .catch((err) => {
          reject(err);
          toast.error("Delete failed");
        });
    });
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[30]" />
        <AlertDialog.Content className="fixed focus:outline-none drop-shadow-md border z-[31] border-neutral-700 top-[50%] left-[50%] h-[220px] lg:w-[30%] md:w-[30%] w-[60%] translate-y-[-50%] translate-x-[-50%] rounded-md bg-neutral-800 p-[35px]">
          <AlertDialog.Title className={`text-[22px] font-bold`}>
            Delete Stock
          </AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. Are you sure you want to delete
            <b> {data.description} </b>
            from inventory?
          </AlertDialog.Description>
          <div className={`flex w-full justify-end space-x-6 mt-[30px]`}>
            <AlertDialog.Cancel asChild>
              <button
                className={`bg-white text-black h-[40px] rounded-[6px] w-[70px] hover:opacity-75 active:opacity-65`}
                type="button"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => handleDelete(data)}
                className={`bg-red-600 text-white h-[40px] rounded-[6px] w-[70px] hover:opacity-75 active:opacity-65`}
                type="button"
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default DeleteStock;
