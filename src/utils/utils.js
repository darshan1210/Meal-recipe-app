import toast from "react-hot-toast";


export function successTost(msg) {
    toast.success(msg, { duration: 3000 });

}

export function errorTost(msg) {
    toast.error(msg, { duration: 3000 });
}
