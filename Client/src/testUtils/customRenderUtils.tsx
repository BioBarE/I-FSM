import {
    ReactElement,
} from 'react';
import {Provider} from 'react-redux';
import {
    render,
    RenderOptions,
} from '@testing-library/react';
import {store} from "../store";


const Wrapper = ({children}: any) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

const customRender = (ui: ReactElement, renderOptions?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, {
        wrapper: Wrapper,
        ...renderOptions,
    });

export * from '@testing-library/jest-dom';
export * from '@testing-library/react';
export {customRender as render};
