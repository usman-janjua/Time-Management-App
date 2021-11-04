
import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductCard from './ProductCard';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

configure({adapter: new Adapter()});

describe('<ProductCard />', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<ProductCard data={{name: "Usman", price: "12", description: "anlfjls", inventoryTime: 1234123}} />);
    });
    it('should render four <Typography /> elements', () => {
        expect(wrapper.find(Typography)).toHaveLength(4);
    });

    it('should render one <CardContent /> elements', () => {
        expect(wrapper.find(CardContent)).toHaveLength(1);
    });

    it('should render one <Card /> elements', () => {
        expect(wrapper.find(Card)).toHaveLength(1);
    });

});