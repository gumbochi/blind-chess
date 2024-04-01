import PocketBase from 'pocketbase';

const url = 'https://blindchess.pockethost.io/'
const client = new PocketBase(url)

const records = await client.collection('posts').getFullList({
    sort: '-created',
});