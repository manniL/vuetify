import VSpeedDial from '@/components/VSpeedDial'
import { test } from '@/test'
import { compileToFunctions } from 'vue-template-compiler'

test('VSpeedDial.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VSpeedDial)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render active component and match snapshot', () => {
    const wrapper = mount(VSpeedDial, {
      slots: {
        default: [compileToFunctions('<span>test</span>')]
      },
      data: {
        isActive: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should generate and remove overlay', () => {
    const wrapper = mount(VSpeedDial, {
      slots: {
        default: [compileToFunctions('<span>test</span>')]
      }
    })

    jest.spyOn(wrapper.vm, 'genOverlay');
    jest.spyOn(wrapper.vm, 'removeOverlay');

    wrapper.setData({
      isActive: true
    })
    expect(wrapper.vm.genOverlay).toBeCalled();

    wrapper.setData({
      isActive: false
    })
    expect(wrapper.vm.removeOverlay).toBeCalled();
  })

  it('should not generate overlay on hover', () => {
    const wrapper = mount(VSpeedDial, {
      slots: {
        default: [compileToFunctions('<span>test</span>')]
      }
    })

    jest.spyOn(wrapper.vm, 'genOverlay');
    jest.spyOn(wrapper.vm, 'removeOverlay');

    wrapper.setData({
      isActive: true,
      hovered: true
    })
    expect(wrapper.vm.genOverlay).not.toBeCalled();
  })

  it('should render component with custom direction and match snapshot', () => {
    const wrapper = mount(VSpeedDial, {
      propsData: {
        direction: 'right'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should activate on click', () => {
    const wrapper = mount(VSpeedDial)

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.trigger('click')
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should activate on hover', () => {
    const wrapper = mount(VSpeedDial, {
      propsData: {
        openOnHover: true
      }
    })

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.trigger('mouseenter')
    expect(wrapper.vm.isActive).toBe(true)
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.isActive).toBe(false)
  })
})
