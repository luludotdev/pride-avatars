import Genderfluid from '../images/genderfluid.png'

export enum Flag {
  Genderfluid = 'Genderfluid',
}

const createFlag = (src: string) => {
  const img = new Image()
  img.src = src

  return img
}

const genderFluidImg = createFlag(Genderfluid)

export const getFlag = (flag: Flag) => {
  switch (flag) {
    case Flag.Genderfluid:
      return genderFluidImg
  }
}
