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