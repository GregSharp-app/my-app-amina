
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	// PUBLIC_MEASUREMENT_ID,
	PUBLIC_DATABASE_URL
} from '$env/static/public';
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	collection,
	CollectionReference,
	FieldValue,
	getFirestore,
	type DocumentData
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID,
	// measurementId: PUBLIC_MEASUREMENT_ID,
	databaseURL: PUBLIC_DATABASE_URL
};

// Initialize Firebase
let firebase: any;

if (!getApps().length) {
	firebase = initializeApp(firebaseConfig);
}

// Auth
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);
const storage = getStorage(firebase)

// helper functions
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(firestore, collectionName) as CollectionReference<T>;
};


// my database
export const listCollections = {
	products: 'Products',
}
export interface TypeProduct {
	id?: string;
	name: string;
	price: number;
	imageUrl?: string;
	description?: string;
	whatsappPhoneNumber?: string;
	ownerID: string;
	ownerImageUrl?: string;
	ownerUsername?: string;
	listFavouriteIDs?: string[];
	createdAt?: FieldValue | { nanoseconds: number, seconds: number };

}


// my Collections Refs
const collection_products = createCollection<TypeProduct>(listCollections.products)

// Export Everything :)
export { auth, storage, firebase, firestore, collection_products }
