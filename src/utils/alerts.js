import Swal from 'sweetalert2'

const successMsg = (msg) => {

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 1500
  });
}

const confirmationMsg = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    customClass: {
      container: 'custom-swal'
    },
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });
  return result.isConfirmed;
};

const errorMsg = async (msg) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: msg,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      container: 'custom-swal'
    },
  });
}

export { successMsg, confirmationMsg, errorMsg }