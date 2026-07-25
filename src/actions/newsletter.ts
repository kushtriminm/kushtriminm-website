"use server"

import { supabase } from "@/lib/supabase"


export async function subscribeEmail(email:string){

  if(!email){
    return {
      success:false,
      message:"Email is required"
    }
  }


  const { error } = await supabase
    .from("newsletter")
    .insert({
      email
    })


  if(error){

    return {
      success:false,
      message:error.message
    }

  }


  return {
    success:true
  }

}