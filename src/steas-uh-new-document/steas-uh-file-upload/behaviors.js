
const uploadBehavior = {
    name: 'input',
    eventHandlers: [
        {
            events: ['input'],
            effect({action, updateState, state, dispatch}) {
                try {
                    const pathStart = action.meta.event.composedPath()[0];
                    if (pathStart.id == 'fileToUpload') {
                        const files = pathStart.files;
                        const fileList = []
                        for (var i=0;i<files.length;i++) {
                            fileList.push(files[i]);
                        }
                        updateState({
                            path: 'file_name',
                            operation: 'set',
                            value: fileList[0].name
                        })
                        updateState({
                            files: fileList
                        })
                        dispatch("FILE_UPLOAD#FILES_SELECTED", {files: fileList})
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        }
    ]
};

module.exports = {
    uploadBehavior
}