import * as React from 'react'
import Image from '../Image'
import View, { IViewProps } from '../View'
import { css } from 'glamor'

const styles = {
  wrapper: css({
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  }),

  wrapperBorder: css({
    position: 'relative',
    // inner transparent border
    ':before': {
      content: `""`,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '1px solid rgba(0, 0, 0, 0.2)',
      borderRadius: '50%',
    },
  }),

  image: css({
    width: '100%',
    height: '100%',
  }),
}

const sizeMap = {
  xs: 18,
  s: 29,
  small: 29,
  m: 40,
  medium: 40,
  l: 225,
  big: 225,
}

export type ProfileImageSizeType = 'xs' | 's' | 'm' | 'l' | number

export const resolveSize = (size: ProfileImageSizeType) =>
  typeof size === 'number' ? size : sizeMap[size]

const DefaultProfileImage: React.FC<IDimensions> = ({ width, height }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      version="1.1"
      style={{
        width: width,
        height: height,
        backgroundColor: '#B4B4B4',
        boxSizing: 'border-box',
        paddingTop: 4,
      }}
    >
      <path
        fill="#909090"
        fillRule="nonzero"
        d="M0.362506473,496.000708 C1.70895909,480.36711 8.07871569,467.694027 20.7664423,455.124822 C31.7969964,444.217661 42.6204039,436.894281 60.9010875,428.064675 C82.9104091,417.365269 93.112377,414.352815 123.873641,409.314745 C142.723977,406.250352 147.229415,405.315453 155.204557,402.822387 C167.633351,398.875034 177.006732,394.667986 179.699637,391.811348 L180.942517,390.512877 L181.719316,358.622415 L182.496116,326.783892 L180.113931,322.680722 C177.369239,318.110102 172.345935,308.189779 170.170896,303.151709 C169.238736,300.970277 166.804764,290.894137 163.231486,274.689212 L157.742103,249.550802 L154.997411,248.615903 C148.834801,246.538348 145.934749,241.604156 143.345417,228.827196 C142.361471,224.048821 140.600725,216.829319 139.357846,212.726149 C134.852408,197.196428 134.593475,196.053774 134.541688,187.847433 C134.489902,180.991503 134.593475,180.056604 135.680994,177.719355 C137.079234,174.706901 139.720352,171.746386 141.066805,171.746386 C141.791818,171.746386 141.895391,171.53863 141.481098,170.499853 C141.222165,169.772709 140.445365,166.448622 139.720352,163.072595 C135.111341,141.154395 132.832729,100.018816 135.473848,85.7875673 C139.150699,65.427533 147.902641,48.8070968 163.1797,32.9138047 C174.365614,21.3314382 185.603314,13.8003031 200.517866,7.87927272 C206.991196,5.33426843 219.316416,2.21793665 227.705852,1.0233428 C238.114966,-0.430945364 263.801139,-0.327067638 273.795961,1.28303712 C299.585707,5.3862073 319.10927,14.8910192 335.422061,31.3556388 C352.045572,48.1318916 361.93682,67.1415154 364.940445,88.176755 C366.442258,98.7203442 366.027965,105.732091 361.93682,140.063679 L358.156396,171.486691 L359.502848,172.161897 C363.386846,174.187512 365.251165,177.92711 365.613672,184.523346 C365.872605,189.82111 365.406525,192.521931 358.933195,221.088305 C355.981357,234.176899 354.997411,237.656803 353.288452,241.136707 C350.802693,246.278654 346.504402,250.693457 344.018643,250.693457 C342.620404,250.693457 342.413257,250.901213 342.102538,252.667134 C340.341792,262.951029 336.768514,280.194732 334.904195,287.57005 C332.625583,296.503535 332.470223,296.970984 325.064733,311.877438 L317.555671,327.095525 L316.986018,338.885647 C316.675298,345.378005 316.519938,358.154965 316.675298,367.296205 C316.986018,389.266344 317.244951,390.35706 323.821854,394.356353 C329.518384,397.784318 346.193682,403.757287 355.722424,405.730964 C357.949249,406.198413 367.477991,407.860457 376.851372,409.418623 C403.676851,413.885365 411.910927,416.014858 427.343345,422.611094 C449.870533,432.219784 467.840497,443.438578 479.699637,455.280639 C491.765924,467.382394 498.601761,481.094254 499.637494,495.481319 L500,500 L249.974107,500 L0,500 L0.362506473,496.000708 Z"
        id="Shape"
      />
    </svg>
  )
}

interface IDimensions {
  width: number
  height: number
}
interface IProfileImageProps {
  readonly image?: string
  readonly showBorder?: boolean
  readonly size?: ProfileImageSizeType
}

/**
 * The ProfileImage is always used to show a profile image to the user.
 * ```example
 * <Card>
 *   <ProfileImage image="https://placeimg.com/100/100/people" />
 *   <ProfileImage />
 * </Card>
 * ```
 */
const ProfileImage: React.FC<IProfileImageProps & IViewProps> = ({
  size = 'm',
  showBorder = true,
  image,
  onClick,
  children,
  ...restProps
}) => {
  const width = resolveSize(size)
  const height = resolveSize(size)
  const pointerStyle = onClick ? { ':hover': { cursor: 'pointer' } } : {}

  return (
    <View
      onClick={onClick}
      {...css(
        styles.wrapper,
        showBorder && styles.wrapperBorder,
        {
          width,
          height,
        },
        pointerStyle,
      )}
      {...restProps}
    >
      {image ? (
        <Image alt="" src={image} {...styles.image} size="contain" />
      ) : (
        <DefaultProfileImage width={width} height={height} />
      )}
      {children}
    </View>
  )
}

export default ProfileImage
