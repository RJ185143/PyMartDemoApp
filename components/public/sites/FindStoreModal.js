import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';

import { useGeolocated } from 'react-geolocated';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { UserStoreContext } from '~/context/userStore';
import StoreListItem from './StoreListItem';

const FindStoreModal = (props) => {
  const { modalProp, toggle } = props;
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  });

  const { setUserStore } = useContext(UserStoreContext);
  const [coordinates, setCoordinates] = useState(coords);
  const [sites, setSites] = useState();
  if (coords && !coordinates) {
    setCoordinates(coords);
  }

  useEffect(() => {
    // Get locations near user.
    async function fetchData() {
      if (coords && coordinates.latitude) {
        fetch(`/api/findSites?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`)
          .then((res) => res.json())
          .then((data) => {
            const { response } = data;
            setSites(response.data.pageContent);
          });
      } else {
        fetch(`/api/findSites`)
          .then((res) => res.json())
          .then((body) => {
            const { response } = body;
            setSites(response.data.pageContent);
          });
      }
    }
    fetchData();
  }, [coordinates]);

  return (
    <Modal isOpen={modalProp} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} className="d-flex flex-columns border-none bg-brand-primary text-white">
        <span className="font-weight-bold h3">Find a Store</span>
        {!isGeolocationAvailable ? (
          <p>
            <small className="text-muted">Geolocation is unavailable.</small>
          </p>
        ) : (
          !isGeolocationEnabled && (
            <p>
              <small className="text-muted">User location not enabled</small>
            </p>
          )
        )}
        {coordinates && coordinates.latitude && (
          <p className="mb-0">
            <small>Your location: [{coordinates ? `${coordinates.latitude.toFixed(2)}, ${coordinates.longitude.toFixed(2)}` : ''}]</small>
          </p>
        )}
      </ModalHeader>
      <ModalBody className="py-0">
        {sites && sites.length > 0 ? (
          <div id="store-modal-list" className="px-2 py-2">
            {sites.map((site) => {
              if (site.address && site.status == 'ACTIVE') {
                return <StoreListItem site={site} toggle={toggle} setUserStore={setUserStore} key={site.id} />;
              }
            })}
          </div>
        ) : (
          <p>
            <small className="text-muted">
              We were unable to find any sites in this organization. Make sure to add them through the API or visit the <Link href="/admin/sites">Sites Dashboard.</Link>
            </small>
          </p>
        )}
      </ModalBody>
    </Modal>
  );
};

export default FindStoreModal;
