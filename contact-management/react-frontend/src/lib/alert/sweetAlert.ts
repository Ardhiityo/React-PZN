import Swal from 'sweetalert2'

export function errorAlert(message: string) {
    return Swal.fire({
        icon: "error",
        title: "Failed!",
        text: message,
    });
}

export function successAlert(message: string) {
    return Swal.fire({
        icon: "success",
        title: "Success!",
        text: message,
    });
}

export async function confirmAlert() {
    const response = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    return response.isConfirmed
}