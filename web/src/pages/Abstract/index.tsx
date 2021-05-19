import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import 'react-day-picker/lib/style.css';

import DayPicker, { DateUtils, RangeModifier } from 'react-day-picker';

import {
  Container,
  Content,
  SectionOne,
  MappContainer,
  SectionTwo,
  Calendar,
  Button,
} from './styles';

import Header from '../../components/Header';
import api from '../../services/api';

interface IDenunciations {
  id: string;
  title: string;
  address: {
    latitude: string;
    longitude: string;
  };
}

const Abstract: React.FC = () => {
  const [denunciations, setDenunciations] = useState<IDenunciations[]>([]);
  const [selectedDates, setSelectedDates] = useState<RangeModifier>({
    from: undefined,
    to: undefined,
  });

  const [modifiers, setModifiers] = useState<any>({
    start: undefined,
    end: undefined,
  });

  const handleDayClick = useCallback(
    (day: Date) => {
      const range = DateUtils.addDayToRange(day, selectedDates);
      setSelectedDates(range);
      setModifiers({ start: range.from, end: range.to });
    },
    [selectedDates],
  );

  const handleReportPDF = useCallback(() => {
    if (selectedDates.from && selectedDates.to) {
      api
        .get('/denunciation/report', {
          params: {
            fromDay: selectedDates.from.getDate(),
            fromMonth: selectedDates.from.getMonth() + 1,
            fromYear: selectedDates.from.getFullYear(),
            toDay: selectedDates.to.getDate(),
            toMonth: selectedDates.to.getMonth() + 1,
            toYear: selectedDates.to.getFullYear(),
          },
        })
        .then(response => {
          window.open(response.data.url);
        });
    }
  }, [selectedDates]);

  useEffect(() => {
    if (selectedDates.from && selectedDates.to) {
      api
        .get('/denunciation/range', {
          params: {
            fromDay: selectedDates.from.getDate(),
            fromMonth: selectedDates.from.getMonth() + 1,
            fromYear: selectedDates.from.getFullYear(),
            toDay: selectedDates.to.getDate(),
            toMonth: selectedDates.to.getMonth() + 1,
            toYear: selectedDates.to.getFullYear(),
          },
        })
        .then(response => {
          setDenunciations(response.data);
        });
    }
  }, [selectedDates]);

  return (
    <Container>
      <Header />
      <Content>
        <SectionOne>
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
                zoom={8}
                center={{ lat: -6.831743312048982, lng: -38.31587067628734 }}
              >
                {denunciations.map(denunciation => (
                  <Marker
                    key={denunciation.id}
                    position={{
                      lat: +denunciation.address.latitude,
                      lng: +denunciation.address.longitude,
                    }}
                    icon={{
                      url:
                        'https://img.icons8.com/color/46/000000/coronavirus--v2.png',
                    }}
                    // onClick={() => {
                    //   window.open(`/complaint/${denunciation.id}`);
                    // }}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </MappContainer>
        </SectionOne>

        <SectionTwo>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              selectedDays={selectedDates}
              onDayClick={handleDayClick}
              modifiers={modifiers}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
          {selectedDates.from && selectedDates.to && (
            <Button onClick={handleReportPDF}>Gerar Relatório</Button>
          )}
        </SectionTwo>
      </Content>
    </Container>
  );
};

export default Abstract;
