import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { api } from '../../client';

export const useGetProperties = routeLoader$(async () => {
  const { data } = await api.service('properties').find();
  return data;
});

export default component$(() => {
  const properties = useGetProperties();
  return (
    <div class="px-4 sm:px-6 lg:px-8">
      <ul class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {properties.value.map((property, key) => (
          <li key={key} class="relative">
            <div>
              <img
                src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                alt=""
                class="pointer-events-none object-cover group-hover:opacity-75"
              ></img>
              <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{property.title}</p>
              <p class="pointer-events-none block text-sm font-medium text-gray-500 truncate">{property.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export const useFetchUsers = routeLoader$(async () => {
  try {
    const users = await fetch('http://localhost:3030/users').then(response => response.json());
    return users;
  } catch (error) {
    console.log(error);
  }
});
