import { auth } from "./firebaseConfig";

export const sign_Up = async(email:string,password:string,name:string)=>{
    // return auth().createUserWithEmailAndPassword(email,password);
    const userCredential = await auth().createUserWithEmailAndPassword(email,password);

    await auth().currentUser?.updateProfile({
        displayName:name
    });

    const user = auth().currentUser;

    return{
        displayName:user?.displayName || '',
        email:user?.email,
        uid:user?.uid
    }
}

export const sign_In= async(email:string,password:string)=>{
    const userCredential= await auth().signInWithEmailAndPassword(email,password);
    
    const user=auth().currentUser;
    return{
        displayName:user?.displayName||'',
        email:user?.email,
        uid:user?.uid
    }
}

export const sign_Out = async()=>{
    return auth().signOut();
}