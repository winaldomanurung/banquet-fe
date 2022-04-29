
export const getAlbum = (data) => {
    console.log('action',data)
    return {
        type: 'GET_ALBUM',
        payload: data
    }
}