import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { isToday, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import Pagination from '@material-ui/lab/Pagination';

import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Content,
  Complaints,
  Section,
  Denunciations,
  Calendar,
  Filter,
  Categories,
  Category,
  Paginate,
  Inf,
} from './styles';

import api from '../../services/api';
import Header from '../../components/Header';

interface Denunciation {
  id: string;
  title: string;
  description: string;
  hour: string;
  status: string;
}

interface Categories {
  id: string;
  title: string;
}

const Dashboard: React.FC = () => {
  const TotalItemsPerPage = 9;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [denunciations, setDenunciations] = useState<Denunciation[]>([]);
  const [totalItems, setTotalItems] = useState<Number>();
  const [currentPage, setCurrentPage] = useState<Number>(1);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoryEnabled, setCategoryEnabled] = useState<String>();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const handleChangePagination = useCallback((event, val) => {
    setCurrentPage(val);
  }, []);

  useEffect(() => {
    api.get('/category').then(response => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get('/denunciation', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          page: currentPage,
          totalPerPage: TotalItemsPerPage,
          day: selectedDate.getDate(),
          ...(categoryEnabled !== null ? { category_id: categoryEnabled } : {}),
        },
      })
      .then(response => {
        setDenunciations(response.data.data);
        setTotalItems(response.data.total);
      });
  }, [categoryEnabled, selectedDate, currentPage]);

  const handleCategoryEnabled = useCallback(
    val => {
      if (categoryEnabled === val) {
        setCategoryEnabled('');
      } else {
        setCategoryEnabled(val);
        setCurrentPage(1);
      }
    },
    [categoryEnabled],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Complaints>
          <h1>Denúncias Recebidas</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          <Inf>
            <span className="pendente">Pendente</span>
            <span className="constatando">Constatando</span>
            <span className="falsa">Falso</span>
            <span className="verificado">Verificado</span>
          </Inf>
          <Section>
            {denunciations.length === 0 && <p> Nenhuma denúncia nessa data </p>}
            {denunciations.map(denunciation => (
              <Denunciations key={denunciation.id}>
                <Link
                  className={denunciation.status}
                  key={denunciation.id}
                  to={`/complaint/${denunciation.id}`}
                >
                  <main>
                    <h4>{denunciation.title}</h4>
                    <strong>{denunciation.description}</strong>
                  </main>
                  <span>
                    <FiClock />
                    {format(parseISO(denunciation.hour), 'HH:mm')}
                  </span>
                </Link>
              </Denunciations>
            ))}
          </Section>
          {totalItems != null &&
            Math.ceil(+totalItems / TotalItemsPerPage) > 1 && (
              <Paginate>
                <Pagination
                  count={Math.ceil(+totalItems / TotalItemsPerPage)}
                  color="standard"
                  page={+currentPage}
                  onChange={handleChangePagination}
                />
              </Paginate>
            )}
        </Complaints>
        <Filter>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              modifiers={{
                available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
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
          <Categories>
            <h2>Categorias</h2>
            {categories.map(category => (
              <Category key={category.id}>
                <div>
                  <input
                    id={category.id}
                    type="checkbox"
                    checked={categoryEnabled === category.id}
                    onChange={val => {
                      handleCategoryEnabled(val.target.id);
                    }}
                  />
                  <span>{category.title}</span>
                </div>
              </Category>
            ))}
          </Categories>
        </Filter>
      </Content>
    </Container>
  );
};

export default Dashboard;
