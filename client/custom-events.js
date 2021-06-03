const deleteSucceed = (id) => {
    const event = new CustomEvent("delete-succeed",
        {
            "detail": {
                message: `The toy ${id} was successfully deleted.`,
                status: 'success'
            }
        });
    document.dispatchEvent(event);
};

const deleteFailed = (id) => {
    const event = new CustomEvent("delete-failed",
        {
            "detail": {
                message: `Deleting the toy ${id} failed. Please, try again.`,
                status: 'failed'
            }
        });
    document.dispatchEvent(event);
};

const updateSucceed = (id) => {
    const event = new CustomEvent("update-succeed",
        {
            "detail": {
                message: `The toy ${id} was successfully updated.`,
                status: 'success',
                id: id
            }
        });
    document.dispatchEvent(event);
};

const updateFailed = (id) => {
    const event = new CustomEvent("update-failed",
        {
            "detail": {
                message: `Updating the toy ${id} failed. Please, try again.`,
                status: 'failed',
                id: id
            }
        });
    document.dispatchEvent(event);
};

export default {
    deleteSucceed: deleteSucceed,
    deleteFailed: deleteFailed,
    updateSucceed:updateSucceed,
    updateFailed:updateFailed
}