//@ts-nocheck
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app';
import { faker } from '@faker-js/faker';
import { randomiseArray } from '../../../src/utils/randomise';

describe('properties service', () => {
  it('registered the service', () => {
    const service = app.service('properties');

    assert.ok(service, 'Registered the service');
  });
  // TODO: fix resolver error

  it('creates a new property', async () => {
    const propertyType = await app.service('propertyTypes').find({ query: { $limit: 1 } });
    const amenities = (await app.service('amenities').find({ query: { $select: ['id'] } })).data.map(
      amenity => amenity.id
    );

    const randomAmenities = randomiseArray(amenities, 3);

    const user = await app.service('users').find({ query: { $limit: 1 } });
    const property = await app.service('properties').create({
      title: faker.word.adjective(7),
      description: faker.lorem.sentences(),
      city: faker.address.city(),
      host: user.data[0].id,
      countryCode: faker.address.countryCode(),
      propertyTypeId: propertyType.data[0].id,
      amenities: randomAmenities,
    });
    assert.ok(property, 'Success Created User');
  });
});
