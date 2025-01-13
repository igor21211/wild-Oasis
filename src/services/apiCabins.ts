import { CabinType } from '../features/cabins/types';
import supabase from './supabase';
  
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins not found');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin not deleted');
  }

  return data;
}

export async function createCabin(cabin: CabinType) {
  const { data, error } = await supabase.from('cabins').insert(cabin);

  if (error) {
    console.log(error);
    throw new Error('Cabin not created');
  }

  return data;
}
