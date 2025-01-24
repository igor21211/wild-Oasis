import { PAGE_SIZE } from '../utils/constants';
import { CabinProps } from '../features/cabins/types';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins({
  filter,
  sortBy,
  page,
}: {
  filter: { field: string; value: string };
  sortBy: { field: string; direction: string };
  page: number;
}) {
  let query = supabase.from('cabins').select('*', {
    count: 'exact',
  });
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  if (page) query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error('Cabins not found');
  }

  return { data, count };
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin not deleted');
  }

  return data;
}

export async function createEditCabin(cabin: CabinProps, id?: number) {
  const hasImagePath = cabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from('cabins');

  if (!id) {
    query = query.insert({
      ...cabin,
      image: imagePath,
    });
  }
  if (id) {
    query = query
      .update({
        ...cabin,
        image: imagePath,
      })
      .eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Error creating cabin');
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabin.image);

  if (storageError) {
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data?.id);
      throw new Error('Error uploading image');
    }

    return data;
  }
}
