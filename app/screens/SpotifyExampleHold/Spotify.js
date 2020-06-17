import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import Album from './Album';

const album = {
  name: 'Remote Control',
  artist: 'Pollo Broster',
  release: 2016,
  cover: require('./broster.jpg'),
  tracks: [
    {name: 'Stories Over'},
    {name: 'More', artist: 'Jan Blomqvist, Elena Pitoulis'},
    {name: 'Empty Floor'},
    {name: 'Her Great Escape'},
    {name: 'Dark Noise'},
    {name: 'Drift', artist: 'Jan Blomqvist, Aparde'},
    {name: 'Same Mistake'},
    {
      name: 'Dancing People Are Never Wrong',
      artist: 'Jan Blomqvist, The Bianca Story',
    },
    {name: 'Back in the Taxi'},
    {name: 'Ghosttrack'},
    {name: 'Just OK'},
    {name: 'The End'},
  ],
};

export default () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Album {...{album}} />
    </>
  );
};
