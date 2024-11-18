import { deleteObject, list, ref, uploadBytes } from "firebase/storage";
import { collection_products, firestore, listCollections, storage, type TypeProduct } from "./firebase/firebase";
import { addDoc, arrayRemove, arrayUnion, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "svelte-sonner";

interface TypeReturn {
    status: "OK" | "ERROR",
    data: any
}
// products
export async function AddProduct(productData: TypeProduct, listImagesToUpload: File[]) {
    if (isEmpty(productData.name)) return 'Product must have a name';
    if (isEmpty(productData.whatsappPhoneNumber) || productData.whatsappPhoneNumber?.length != 10) return 'Product must have a phone number (10 digits)';
    if (isEmpty(productData.price) || productData.price <= 0) return 'Product must have a price > 0';

    try {
        // toast.info('Uploading product ...');
        productData.createdAt = serverTimestamp();
        const id = (await addDoc(collection_products, productData)).id;
        // console.log(id);


        if (listImagesToUpload) {
            // toast.info('Uploading pictures ...');
            await uploadImages(id, listImagesToUpload);
        }
        toast.success('Success : Product Uploaded!');
    } catch (error) {
        toast.error('FAILED : ' + error);
        console.log(error);
    }
}
export async function AddFavourite(productId: string, uid: string) {
    try {
        const productRef = doc(firestore, listCollections.products, productId);

        await updateDoc(productRef, {
            listFavouriteIDs: arrayUnion(uid),
        });

        // console.log(`Added UID ${uid} to product ${productId}`);
    } catch (error) {
        toast.error("Error updating product favorites:" + error);
    }
};

export async function RemoveFavourite(productId: string, uid: string) {
    try {
        const productRef = doc(firestore, listCollections.products, productId);

        await updateDoc(productRef, {
            listFavouriteIDs: arrayRemove(uid),
        });

        // console.log(`Removed UID ${uid} from product ${productId}`);
    } catch (error) {
        toast.error("Error removing product from favorites:" + error);
    }
};

export async function DeleteProduct(_id: string) {

    let _path = `${listCollections.products}/${_id}`;
    try {
        try {
            const _listImages = (await list(ref(storage, _path))).items;
            for (const _img of _listImages) {
                await deleteObject(_img);
            }

            // const batch = storage.
            toast.success(`product IAMGES were deleted`);
        } catch (error) {
            console.log('error deleting images : ' + error);
        }

        await deleteDoc(doc(firestore, _path));
        toast.success(`product DETAILS were deleted`);
    } catch (error) {
        console.log(error);
        toast.error('Error deleting.');
    }
}

export async function uploadImages(id: string, listImagesToUpload: File[]) {
    if (!listImagesToUpload) {
        return;
    }
    try {
        // console.log("images");
        // console.log(listImagesToUpload[0].name);

        for (let index = 0; index < listImagesToUpload.length; index++) {
            const element = listImagesToUpload[index];

            const storageRef = ref(storage, `${listCollections.products}/${id}/${element.name}`);
            await uploadBytes(storageRef, element);

        }
    } catch (error) {
        console.log(error);

    }
}

function isEmpty(val: any) {
    return !val || val === undefined || val === null || val.length <= 0;
}

export function getLinkWtspPhoneNumber(__phone?: string) {
    if (!__phone) {
        // console.log(`invalid phone number`, __phone);
        return '#';
    }
    let _phone = __phone.replaceAll(' ', '');
    let p =
        _phone[0] === '0' ? `212${_phone.slice(1, _phone.length)}` : _phone.slice(1, _phone.length);

    return `https://wa.me/${p}`;
}

// sort
export function SortByLikes(a: TypeProduct, b: TypeProduct): number {
    let a_l = a.listFavouriteIDs?.length ?? 0;
    let b_l = b.listFavouriteIDs?.length ?? 0;
    // acending
    return b_l - a_l;
}
export function SortByPrice(a: TypeProduct, b: TypeProduct): number {
    let a_l = a.price ?? 0;
    let b_l = b.price ?? 0;
    // acending
    return b_l - a_l;
}
export function SortByName(a: TypeProduct, b: TypeProduct): number {
    if (a.name < b.name) {
        return 1;
    }
    if (a.name > b.name) {
        return -1;
    }
    return 0;
}
export function SortByDate(a: TypeProduct, b: TypeProduct): number {
    let a_l = (a as any).createdAt?.seconds ?? 0;
    let b_l = (b as any).createdAt?.seconds ?? 0;
    // acending
    return b_l - a_l;
}