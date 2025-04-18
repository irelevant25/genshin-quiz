const SITES_TOP_QUIZZES = Vue.createApp({
    template: html`
        <div class="container quiz-container">
            <div :class="levelClass" name="quiz-difficulty-display">
                <span class="recommended-ar">{{ difficultyText }}</span>
            </div>
            <div name="daily-quizzes" class="d-flex justify-content-center gap-3 py-3">
                <button v-for="quiz in dailyQuizzes" :key="quiz" type="button" class="btn btn-primary" :class="{ 'done': buttonDone(quiz) }" :data-quiz="quiz" @click="renderQuiz(quiz)">
                    {{ quiz }}
                </button>
            </div>
            <div :id="'daily-' + currentQuiz" style="margin-top: -2rem">
                <div id="quiz"></div>
            </div>
        </div>
    `,

    data() {
        return {
            dailyQuizzes: [],
            doneQuizzes: [],
            difficulty: 1,
            currentQuiz: null,
            state: storageManager.getTopMenuDailyState(),
            dailies: 2,
            difficulty: this.state?.difficulty ?? storageManager.getDifficulty() ?? 1,
        };
    },

    computed: {
        levelClass() {
            return `level-${difficultyFromNumberToString(this.difficulty)}`;
        },

        difficultyText() {
            return difficultyFromNumberToString(this.difficulty);
        },

        buttonDone() {
            return (quiz) => {
                return this.state?.done?.includes(quiz);
            };
        },
    },

    mounted() {
        this.initializeDailyQuizzes();
    },

    methods: {
        initializeDailyQuizzes() {
            const date = getTodayString();
            if (this.state?.date === date) {
                // Use saved daily quizzes if date matches
                this.dailyQuizzes = this.state.dailyQuizzes;
            } else {
                // Generate new daily quizzes
                let quizPool = shuffleArray(Object.keys(QUIZZES));
                this.dailyQuizzes = [];

                for (let i = 0; i < this.dailies; i++) {
                    this.dailyQuizzes.push(quizPool.pop());
                }

                // Reset daily states in storage
                Object.values(storageManager.data.topMenu).forEach((item) => {
                    if (item.dailyState) item.dailyState = null;
                });

                storageManager.saveData();
                storageManager.saveTopMenuDailyState({
                    date,
                    dailyQuizzes: this.dailyQuizzes,
                    done: [],
                    difficulty: storageManager.getDifficulty() ?? 1,
                });
                this.state = storageManager.getTopMenuDailyState();
            }

            // Update badge count
            this.updateBadge();
        },

        generateCompnent(BASE) {
            const daily = Vue.createApp({
                components: {
                    'base-component': createComponent(BASE, {}),
                },
                template: html`<base-component :daily="true" :onCompleteQuestion="updateStats"></base-component>`,
                methods: {
                    updateStats: (...args) => this.updateStats(...args),
                },
            });
            daily.mount('#quiz');
        },

        renderQuiz(quizName) {
            this.currentQuiz = quizName;
            if (quizName === 'banners') {
                this.generateCompnent(SITES_TOP_QUIZZES_BANNERS);
            } else if (quizName === 'pixelate') {
                this.generateCompnent(SITES_TOP_QUIZZES_PIXELATE);
            } else if (quizName === 'mismatch') {
                this.generateCompnent(SITES_TOP_QUIZZES_MISMATCH);
            } else if (quizName === 'music') {
                this.generateCompnent(SITES_TOP_QUIZZES_MUSIC);
            } else if (quizName === 'dish') {
                this.generateCompnent(SITES_TOP_QUIZZES_DISH);
            } else if (quizName === 'voice') {
                this.generateCompnent(SITES_TOP_QUIZZES_VOICE);
            }
        },

        updateStats(character, difficulty, isSuccess) {
            storageManager.saveStats(this.currentQuiz, character.name, isSuccess, difficulty, true, this.dailyQuizzes);
            this.updateBadge();
            this.$forceUpdate();
        },

        updateBadge() {
            // Update the badge element in the DOM
            const badgeElement = document.querySelector(`#${MENU_ITEMS_TOP.daily.id}-badge-icon div.badge-daily`);

            if (badgeElement) {
                const remainingDailies = this.dailyQuizzes.length - this.state?.done?.length;
                badgeElement.textContent = remainingDailies;

                if (remainingDailies === 0) {
                    badgeElement.classList.remove('visible');
                } else {
                    badgeElement.classList.add('visible');
                }
            }
        },
    },
});

document.addEventListener('DOMContentLoaded', () => {
    SITES_TOP_QUIZZES.mount('#site-daily');
});
