import React, { useCallback, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { useRouteMatch } from 'react-router-dom';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

import { FiMap } from 'react-icons/fi';
import * as dotenv from 'dotenv';
import {
  Container,
  Content,
  Denunciation,
  Section,
  Anddress,
  Status,
  Button,
  SectionTwo,
  MappContainer,
  Image,
} from './styles';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Header from '../../components/Header';

interface DenunciationParams {
  id: string;
}

interface Idenunciation {
  id: string | undefined;
  anonymous: false;
  title: string | undefined;
  description: string | undefined;
  status: string | undefined;
  photo: string | undefined;
  hour: Date;
  address: {
    id: string | undefined;
    address: string | undefined;
    street: string | undefined;
    city: string | undefined;
    zipcode: string | undefined;
    number: string | undefined;
    complement: string | undefined;
    latitude: string;
    longitude: string;
  };
  category: {
    title: string | undefined;
  };
  photo_url: string | undefined;
}

interface Coordinates {
  lat: Number;
  lng: Number;
}

const Complaint: React.FC = () => {
  dotenv.config();
  const { params } = useRouteMatch<DenunciationParams>();
  const { addToast } = useToast();
  const [denunciation, setDenunciation] = useState<Idenunciation>();
  const [status, setStatus] = useState<string>();
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const handleStatus = useCallback(event => {
    setStatus(event.target.value);
  }, []);

  const handleStatusConfirm = useCallback(() => {
    api.put(`/denunciation/status/${params.id}`, { status }).then(() => {
      addToast({
        type: 'success',
        title: 'Status atualizado com sucesso',
        description: `O status desta denúncia foi atualizado para ${status}`,
      });
    });
  }, [addToast, params.id, status]);

  useEffect(() => {
    api.get(`/denunciation/${params.id}`).then(response => {
      setDenunciation(response.data);
      setStatus(response.data.status);
      setCoordinates({
        lat: +response.data.address.latitude,
        lng: +response.data.address.longitude,
      });
    });
  }, [params.id]);

  return (
    <Container>
      <Header />

      <Content>
        <Denunciation>
          <h1>{denunciation?.title}</h1>
          <p>{denunciation?.description}</p>
          <Section>
            <Anddress>
              <h2>Endereço</h2>
              <FiMap size={14} color="#ff0000" />
              <span>
                {denunciation?.address.address}, {denunciation?.address.number}{' '}
                / {denunciation?.address.street} - {denunciation?.address.city}{' '}
                - {denunciation?.address.zipcode}
              </span>
              {denunciation?.address.complement !== 'undefined' && (
                <p>{denunciation?.address.complement}</p>
              )}
            </Anddress>
            <Status>
              <h2>Alterar status:</h2>
              <div>
                <select value={status} onChange={handleStatus}>
                  <option value="pendente">Pendente</option>
                  <option value="constatando">Constatando</option>
                  <option value="falsa">Falsa</option>
                  <option value="verificado">Verificado</option>
                </select>
                <Button onClick={handleStatusConfirm}>Salvar alteração</Button>
              </div>
            </Status>
          </Section>
        </Denunciation>
        <SectionTwo>
          <MappContainer>
            <LoadScript
              googleMapsApiKey={
                process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
              }
            >
              <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: '100%',
                }}
                zoom={15}
                center={{ lat: coordinates.lat, lng: coordinates.lng }}
              >
                <Marker
                  position={{ lat: coordinates.lat, lng: coordinates.lng }}
                  icon={{
                    url:
                      'https://img.icons8.com/color/46/000000/coronavirus--v2.png',
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </MappContainer>
          {denunciation?.photo_url && (
            <Image>
              <img src={denunciation?.photo_url} alt={denunciation.photo} />
            </Image>
          )}
        </SectionTwo>
      </Content>
    </Container>
  );
};

export default Complaint;
