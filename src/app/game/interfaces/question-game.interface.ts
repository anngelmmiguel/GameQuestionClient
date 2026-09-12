

export interface categoryDto {
    id: number;
    name: string;
    idSubject: number;
    idComplexity: number;
    
    subjectDto: subjectDto;
    complexityDto: complexityDto;
}

export interface subjectDto {
    id: number;
    name: string;
    categoriesDto: categoryDto[];
}

export interface complexityDto {
    id: number;
    level: number;
    categoriesDto: categoryDto[];
}


export class createQuestionDto {
    name: string = "";
    idCategory: number = 0;
}

export interface questionDto {
    id: number;
    name: string;
    idCategory: number;
    categoryDto: categoryDto;    
}

export class createAnswerDto {
    name: string = "";
    idQuestion: number = 0;
    correct: boolean = false;
}


export interface answerDto {
    id: number;
    name: string;
    idQuestion: number;
    correct: boolean;
    questionDto: questionDto;
}


export interface gameDto {
    id: number;
    idUser: number;
    startDate: Date;
    endDate: Date;
    accumulatedMoney: number;
    accumulatedPoints: number;
    status: string;
    //userDto: userDto;
}


export interface rewardDto {
    id: number;
    value: number;
    type: string;
    idComplexity: number;
    complexityDto: complexityDto
}


export interface roundDto {
    id: number;
    idGame: number;
    idQuestion: number;
    idAnswer: number;
    numberRound: number;
    idReward: number;

    gameDto: gameDto;
    questionDto: questionDto;
    answerDto: answerDto;
    rewardDto: rewardDto;
}

export class answerGameDto {
    idRound: number = 0;
    idAnswer: number = 0;
}

export class gameIdDto {
    idGame: number = 0;
}